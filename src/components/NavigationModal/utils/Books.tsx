import Grid from "@mui/material/Grid";
import { books as newTestamentMetadata } from "../../../applicationLogic/data/newTestamentMetadata";
import { oldTestamentBooks } from "../../../applicationLogic/data/oldTestamentMetadata";
import { useEffect, useRef, useState } from "react";
import BookSearchBar from "../../BookSearchBar";
import Box from "@mui/material/Box";
import { BOOKCHAPTERMENU_OFFSET } from "../../../constants";

interface BookProps {
	bookData: any[];
	handleClick: (params: any) => any;
	isCurrentBook: boolean;
}

function Book({
	bookData,
	handleClick,
	isCurrentBook,
}: BookProps) {
	const bookRef = useRef<null | HTMLDivElement>(null);

	useEffect(() => {
		if (isCurrentBook == true) {
			handleClick(bookRef);
		}
	}, [isCurrentBook]);

	function onClick() {
		handleClick(bookRef);
	}

	return (
		<div
			className="BookChapterMenu__Books__Book"
			id={bookData[0]}
			ref={bookRef}
			onClick={onClick}
		>
			<Grid item xs={12}>
				<p>{bookData[0]}</p>
			</Grid>
		</div>
	);
}



interface BooksProps {
	onChange?: () => any;
	handleClick: (params: any) => any;
	currentBook: string;
}

function Books({
	handleClick,
	currentBook,
	onChange,
}: BooksProps) {
	const [childClicked, setChildClicked] =
		useState<any>(null);
	const [filteredBooks, setFilteredBooks] = useState(
		Object.entries(newTestamentMetadata)
	);
	const [errorMessage, setErrorMessage] = useState("");

	function handleChildClicked(newChildClicked: any) {
		handleClick(newChildClicked.current);

		if (childClicked?.current?.style?.color !== undefined) {
			childClicked.current.style.color = "#001533CC";
			childClicked.current.style.backgroundColor = "white";
		}

		if (
			newChildClicked?.current?.style?.color !== undefined
		) {
			newChildClicked.current.style.color = "blue";
			newChildClicked.current.style.backgroundColor =
				"#015ad90d";
		}

		setChildClicked(newChildClicked);
	}

	function bookSearchValidation(book: string) {
		book = book.toLowerCase();
		book = book.charAt(0).toUpperCase() + book.slice(1);
		if (oldTestamentBooks[book] !== undefined) {
			setErrorMessage(
				"The Greek Lexicon Prototype only contains New Testament Books"
			);
			return false;
		} else {
			if (newTestamentMetadata[book] !== undefined) {
				setErrorMessage("");
				return true;
			}
			setErrorMessage("");
			return false;
		}
	}

	function handleSearchInputClick(userInput: string) {
		bookSearchValidation(userInput);
		handleClick(userInput);
	}

	function onBookFilter(filterKey: string) {
		let tempArray = Object.entries(
			newTestamentMetadata
		).filter((book) => {
			if (filterKey === "") {
				return true;
			}

			if (
				filterKey.toLowerCase().charAt(0) ===
				book[0].toLowerCase().charAt(0)
			) {
				return book[0]
					.toLowerCase()
					.includes(filterKey.toLowerCase());
			}

			// if the current book starts with a number
			if (/^\d$/.test(book[0].charAt(0))) {
				if (
					book[0].toLowerCase().slice(2).charAt(0) ===
					filterKey.toLowerCase().charAt(0)
				) {
					return book[0]
						.toLowerCase()
						.slice(2)
						.includes(filterKey.toLowerCase());
				}
			}

			return false;
		});
		if (onChange) {
			onChange();
		}
		setFilteredBooks(tempArray);
	}

	// Sets color of selected book to be default colors.
	function handleBookSearchClick() {
		if (childClicked?.current?.style?.color !== undefined) {
			childClicked.current.style.color = "#001533CC";
			childClicked.current.style.backgroundColor = "white";
		}
	}

	return (
		<Box>
			<Grid
				container
				direction="row"
				justifyContent="center"
				alignItems="center"
				style={{ height: "100%" }}
			>
				<Grid item xs={10}>
					<BookSearchBar
						handleClick={handleBookSearchClick}
						onSearch={handleSearchInputClick}
						onFilter={onBookFilter}
						onValidation={bookSearchValidation}
					/>
				</Grid>

				<Grid item xs={12}>
					<Grid
						container
						direction="row"
						justifyContent="center"
						alignItems="center"
						style={{ height: "100%" }}
					>
						<Grid
							item
							xs={12}
							style={{ borderBottom: "1px solid grey" }}
						>
							<h5 className="NavigationModal__Books__newTestamentHeader">
								NEW TESTAMENT
							</h5>
						</Grid>

						<Grid
							item
							xs={12}
							style={{ height: `calc(100% - ${BOOKCHAPTERMENU_OFFSET})` }}
						>
							<Grid
								container
								direction="row"
								justifyContent="center"
								alignItems="center"
							>
								{errorMessage === ""
									? filteredBooks.map(
											(book: any[], idx: number) => (
												<Book
													key={`book ${idx}`}
													bookData={book}
													handleClick={handleChildClicked}
													isCurrentBook={
														childClicked === null &&
														book[0] === currentBook
													}
												/>
											)
									  )
									: errorMessage}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
}

export default Books;
import { useState, useEffect } from "react";
import "../App.css";
import Grid from "@mui/material/Grid";
import NextChapterButton from "./NextChapterButton";
import PreviousChapterButton from "./PreviousChapterButton";
import TextView from "./TextView";
import InformationPanel from "../components/InformationPanel";
import useWindowSize from "../hooks/useWindowSize";
import { useGreekWords } from "../hooks/GreekWordsContext";
import { ViewHeader } from "./ViewHeader";
import BookChapterMenu from "./NavigationModal/utils/BookChapterMenu";
import ChapterNavigationBar from "./ChapterNavigationBar";
import { useLocation } from "react-router-dom";
import { NavigationHeader } from "./NavigationModal/utils/NavigationHeader";
import { ClickAwayListener } from "@mui/material";
import GreekWordsModal from "./GreekWordsModal";

export function View() {
	const [textViewSize, setTextViewSize] =
		useState(10);
	const windowSize = useWindowSize([]);
	const { greekWords, showGreekWords, setShowGreekWords } =
		useGreekWords();
	const [greekTextDialogOpen, setGreekTextDialogOpen] =
		useState(false);
	const [greekTextModalOpen, setGreekTextModalOpen] =
		useState(false);
	const [defaultNavigationTab, setDefaultNavigationTab] =
		useState<"Books" | "Chapters">("Books");
	const { search } = useLocation();
	const desktopTextWidthMax = 10;
	const mobileTextWidthMax = 12;

	useEffect(() => {
		// Reduces the size of the TextView to make room for GreekWordsDialog
		if (
			showGreekWords &&
			windowSize.innerWidth >= 900 &&
			textViewSize === desktopTextWidthMax
		) {
			setTextViewSize(5);
			setGreekTextDialogOpen(true);
		}

		if (showGreekWords && windowSize.innerWidth < 900) {
			setGreekTextModalOpen(true);
		}
	}, [greekWords, showGreekWords]);

	useEffect(() => {
		// default right dialog to open for desktop breakpoint
		if (windowSize.innerWidth >= 900) {
			setTextViewSize(5);
			setGreekTextDialogOpen(true);
		}
	}, []);

	useEffect(() => {
		if (windowSize.innerWidth < 900) {
			setGreekTextDialogOpen(false);
		} else {
			setGreekTextDialogOpen(true);
		}
	}, [windowSize.innerWidth]);

	function onGreekWordsModalClose() {
		setShowGreekWords(false);
		setGreekTextModalOpen(false);
	}

	const [navigationModalOpen, setNavigationModalOpen] =
		useState(false);

	const onNavBarClick = (
		defaultOpenTab?: "Books" | "Chapters"
	) => {
		if (defaultOpenTab !== undefined) {
			setDefaultNavigationTab(defaultOpenTab);
		}
		setNavigationModalOpen(true);
	};

	useEffect(() => {
		setNavigationModalOpen(false);
	}, [search]);

	const onNavigationModalClose = (event: any) => {
		setNavigationModalOpen(false);
	};

	return (
		<>
			<Grid
				className="MainViewContainer"
				container
				justifyContent="center"
				alignItems="flex-start"
			>
				<Grid
					id="ViewHeader"
					container
					style={{ borderBottom: "2px solid #E5E8EB" }}
				>
					{navigationModalOpen &&
					windowSize.innerWidth < 900 ? (
						""
					) : (
						<ViewHeader
							showIconText={windowSize.innerWidth >= 900}
						/>
					)}
				</Grid>

				{navigationModalOpen ? (
					<Grid
						item
						md={textViewSize}
						xs={mobileTextWidthMax}
						style={{ height: "90%", overflowY: "auto" }}
						id="BookChapterMenuContainer"
					>
						<Grid id="BookChapterMenu" container>
							<ClickAwayListener
								onClickAway={onNavigationModalClose}
							>
								<div
									style={{
										width: "100%",
										padding: "0px 0px 40px 0px",
									}}
								>
									<Grid
										id="ViewHeader"
										container
										style={{
											borderBottom: "2px solid #E5E8EB",
										}}
									>
										{navigationModalOpen &&
										windowSize.innerWidth < 900 ? (
											<NavigationHeader
												onClick={onNavigationModalClose}
											/>
										) : (
											""
										)}
									</Grid>
									<BookChapterMenu
										withClickableOptions={true}
										onClose={onNavigationModalClose}
										openTab={defaultNavigationTab}
									/>
								</div>
							</ClickAwayListener>
						</Grid>
					</Grid>
				) : (
					<>
						<Grid
							item
							md={textViewSize}
							xs={mobileTextWidthMax}
							style={{
								height: "100%",
								position: "relative",
							}}
						>
							<Grid
								container
								direction="row"
								justifyContent={{
									lg: "center",
									md: "center",
									sm: "flex-start",
								}}
								alignItems="flex-start"
								style={{
									marginLeft: "0px",
									marginBottom: "0px",
									height: "0px",
								}}
							>
								<Grid
									item
									xs={12}
								>
									<ChapterNavigationBar
										onClick={onNavBarClick}
									/>
								</Grid>
								<Grid
									item
									xs={12}
								>
									<TextView />
								</Grid>
							</Grid>

							<Grid
								container
								style={{
									height: "100%",
									maxHeight: "85vh",
								}}
								alignItems="flex-end"
							>
								<Grid
									item
									xs={6}
								>
									<PreviousChapterButton />
								</Grid>
								<Grid
									item
									xs={6}
								>
									<NextChapterButton />
								</Grid>
							</Grid>
						</Grid>
					</>
				)}

				<Grid
					item
					md={textViewSize !== desktopTextWidthMax ? 7 : 0}
					xs={0}
					style={{
						height: "100%",
						padding: "0px",
						backgroundColor: navigationModalOpen
							? "rgba(0, 0, 0, 0.2)"
							: "white",
					}}
				>
					<InformationPanel
						open={greekTextDialogOpen}
						greekWords={greekWords ? greekWords : []}
					/>
				</Grid>
			</Grid>

			<GreekWordsModal
				open={greekTextModalOpen}
				onClose={() => onGreekWordsModalClose()}
				greekWords={greekWords ? greekWords : []}
			/>
		</>
	);
}

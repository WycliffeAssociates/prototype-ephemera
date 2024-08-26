import { useEffect, useState } from "react";
import "../App.css";
import { ClickAwayListener } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";
import { useLocation } from "react-router-dom";
import useGreekWordsParams from "src/hooks/useGreekWordsParams";
import InformationPanel from "../components/InformationPanel";
import { DESKTOP_BREAKPOINT } from "../constants";
import useWindowSize from "../hooks/useWindowSize";
import ChapterNavigationBar from "./ChapterNavigationBar";
import InformationWindow from "./InformationWindow";
import BookChapterMenu from "./NavigationModal/utils/BookChapterMenu";
import { NavigationHeader } from "./NavigationModal/utils/NavigationHeader";
import NextChapterButton from "./NextChapterButton";
import PreviousChapterButton from "./PreviousChapterButton";
import TextView from "./TextView";
import { ViewHeader } from "./ViewHeader";

export function View() {
	const [textViewSize, setTextViewSize] = useState(10);
	const windowSize = useWindowSize([]);
	const { greekWords, showGreekWords, removeAllParams } = useGreekWordsParams();
	const [informationPanelOpen, setInformationPanelOpen] = useState(false);
	const [informationWindowOpen, setInformationWindowOpen] = useState(false);
	const [defaultNavigationTab, setDefaultNavigationTab] = useState<
		"Books" | "Chapters"
	>("Books");
	const { search } = useLocation();
	const desktopTextWidthMax = 10;
	const mobileTextWidthMax = 12;

	useEffect(() => {
		// Reduces the size of the TextView to make room for GreekWordsDialog
		if (
			showGreekWords &&
			windowSize.innerWidth >= DESKTOP_BREAKPOINT &&
			textViewSize === desktopTextWidthMax
		) {
			setTextViewSize(5);
			setInformationPanelOpen(true);
		}

		if (showGreekWords && windowSize.innerWidth < DESKTOP_BREAKPOINT) {
			setInformationWindowOpen(true);
		}
	}, [showGreekWords, textViewSize, windowSize.innerWidth]);

	useEffect(() => {
		// default right dialog to open for desktop breakpoint
		if (windowSize.innerWidth >= DESKTOP_BREAKPOINT) {
			setTextViewSize(5);
			setInformationPanelOpen(true);
		}
	}, [windowSize.innerWidth]);

	useEffect(() => {
		if (windowSize.innerWidth < DESKTOP_BREAKPOINT) {
			setInformationPanelOpen(false);
		} else {
			setInformationPanelOpen(true);
		}
	}, [windowSize.innerWidth]);

	function onInformationWindowClose() {
		removeAllParams();
		setInformationWindowOpen(false);
	}

	const [navigationModalOpen, setNavigationModalOpen] = useState(false);

	const onNavBarClick = (defaultOpenTab?: "Books" | "Chapters") => {
		if (defaultOpenTab !== undefined) {
			setDefaultNavigationTab(defaultOpenTab);
		}
		setNavigationModalOpen(true);
	};

	useEffect(() => {
		if (search) {
			setNavigationModalOpen(false);
		}
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
				<Grid container style={{ borderBottom: "2px solid #E5E8EB" }}>
					{navigationModalOpen && windowSize.innerWidth < DESKTOP_BREAKPOINT ? (
						""
					) : (
						<ViewHeader
							showIconText={windowSize.innerWidth >= DESKTOP_BREAKPOINT}
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
							<ClickAwayListener onClickAway={onNavigationModalClose}>
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
										windowSize.innerWidth < DESKTOP_BREAKPOINT ? (
											<NavigationHeader onClick={onNavigationModalClose} />
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
							// md={textViewSize}
							xs={12}
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
								<Grid item xs={12}>
									<ChapterNavigationBar onClick={onNavBarClick} />
								</Grid>
								<Grid item xs={12}>
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
								<Grid item xs={6}>
									<PreviousChapterButton />
								</Grid>
								<Grid item xs={6}>
									<NextChapterButton />
								</Grid>
							</Grid>
						</Grid>
					</>
				)}

				{/* <Grid
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
						open={informationPanelOpen}
						alignedText={greekWords}
					/>
				</Grid> */}
			</Grid>

			{greekWords ? (
				<InformationWindow
					open={informationWindowOpen && showGreekWords}
					onClose={() => onInformationWindowClose()}
					alignedText={greekWords}
				/>
			) : (
				<React.Fragment />
			)}
		</>
	);
}

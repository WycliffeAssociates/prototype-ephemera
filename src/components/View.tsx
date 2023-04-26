import {useState, useEffect} from 'react';
import '../App.css';
import Grid from '@mui/material/Grid';
import NextChapterButton from './NextChapterButton';
import PreviousChapterButton from './PreviousChapterButton';
import TextView from "./TextView";
import GreekWordsDialog from './GreekWordsDialog';
import GreekWordsModal from './GreekWordsModal';
import useWindowSize from '../hooks/useWindowSize';
import { useGreekWords } from '../hooks/GreekWordsContext';
import { ViewHeader } from './ViewHeader';
import BookChapterMenu from './NavigationModal/utils/BookChapterMenu';
import ChapterNavigationBar from './ChapterNavigationBar';
import { useLocation } from "react-router-dom";
import { NavigationHeader } from './NavigationModal/utils/NavigationHeader';


export function View() {
    const [textViewSize, setTextViewSize] = useState<number>(10);
    const windowSize = useWindowSize([]);
    const {greekWords, showGreekWords, setShowGreekWords} = useGreekWords();
    const [greekTextDialogOpen, setGreekTextDialogOpen] = useState<boolean>(false);
    const [greekTextModalOpen, setGreekTextModalOpen] = useState<boolean>(false); 
    const { search } = useLocation();
    const desktopTextWidthMax = 10;
    const mobileTextWidthMax = 12;

    useEffect(() => {
      // Reduces the size of the TextView to make room for GreekWordsDialog
      if(showGreekWords && windowSize.innerWidth >= 900 && textViewSize === desktopTextWidthMax)
      {
        setTextViewSize(5);
        setGreekTextDialogOpen(true);
      }
  
      if(showGreekWords && windowSize.innerWidth < 900)
      {
        setGreekTextModalOpen(true);
      }
    }, [greekWords, showGreekWords])


    useEffect(() => {
      // default right dialog to open for desktop breakpoint
      if(windowSize.innerWidth >= 900)
      {
        setTextViewSize(5);
        setGreekTextDialogOpen(true);
      }
    }, [])


    useEffect(() => {
        if(windowSize.innerWidth < 900) {
            setGreekTextDialogOpen(false);
        } else {
            setGreekTextDialogOpen(true);
        }
    }, [windowSize.innerWidth])


    function onGreekWordsModalClose() {
        setShowGreekWords(false);
        setGreekTextModalOpen(false)
    }


    const [navigationModalOpen, setNavigationModalOpen] = useState(false);


    const onNavBarClick = () => {
        setNavigationModalOpen(true);
    }

    useEffect(() => {
        setNavigationModalOpen(false);
    }, [search])

    const onNavigationModalClose = () => {
        setNavigationModalOpen(false);
    }

    return (
        <>
            <Grid 
                className="MainViewContainer" 
                container 
    
                justifyContent="center" 
                alignItems="flex-start"
            >   
                <Grid id="ViewHeader" container style={{borderBottom: "2px solid #E5E8EB"}}>
                    { navigationModalOpen && windowSize.innerWidth < 900 ? 
                        <NavigationHeader onClick={onNavigationModalClose}/> 
                    : 
                        <ViewHeader showIconText={windowSize.innerWidth >= 900 }/>
                    }
                </Grid>
                

                { navigationModalOpen ? 
                    <Grid item xl={textViewSize} 
                        lg={textViewSize} 
                        md={textViewSize} 
                        sm={mobileTextWidthMax} 
                        xs={mobileTextWidthMax} 
                        style={{height:"90%", overflowY:"auto"}}
                    >
                            
                        <Grid id="BookChapterMenu" container >
                            <BookChapterMenu withClickableOptions={true} onClose={onNavigationModalClose}/>
                        </Grid>
                        
                    </Grid>
                :
                    <> 
                    <Grid 
                        item 
                        xl={textViewSize} 
                        lg={textViewSize} 
                        md={textViewSize} 
                        sm={mobileTextWidthMax} 
                        xs={mobileTextWidthMax} 
                        style={{height:"100%",  position: "relative"}}
                    >
                            <Grid 
                                container 
                                direction="row" 
                                justifyContent={{lg: "center", md: "center", sm:"flex-start"}} 
                                alignItems="flex-start" 
                                style={{marginLeft:"0px", marginBottom:"0px", height:"0px"}}
                            >
                                <Grid 
                                    item
                                    xl={12} lg={12} md={12} sm={12} xs={12} 
                                >
                                    <ChapterNavigationBar onClick={onNavBarClick} />
                                </Grid>
                                <Grid xl={12} lg={12} md={12} sm={12} xs={12} >
                                    <TextView/>
                                </Grid>
                            </Grid>

                        <Grid container style={{height: "100%", maxHeight: "85vh"}} alignItems="flex-end">
                            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                <PreviousChapterButton/>
                            </Grid>
                            <Grid item xl={6} lg={6} md={6} sm={6} xs={6} >
                                <NextChapterButton/>
                            </Grid>
                        </Grid> 
                    </Grid>

                    
                    </>
                }
                
                
                <Grid 
                    item 
                    xl={(textViewSize !== desktopTextWidthMax ? 7 : 0)} 
                    lg={(textViewSize !== desktopTextWidthMax ? 7 : 0)} 
                    md={(textViewSize !== desktopTextWidthMax ? 7 : 0)} 
                    sm={0} xs={0}
                    style={{height:"100%", padding:"0px", backgroundColor: (navigationModalOpen) ? "rgba(0, 0, 0, 0.2)" : "white"}}
                >
                    <GreekWordsDialog 
                        open={greekTextDialogOpen} 
                        greekWords={greekWords ? greekWords : []}
                    />
                </Grid>
            </Grid>


            <GreekWordsModal 
                open={greekTextModalOpen} 
                onClose={() =>(onGreekWordsModalClose())} 
                greekWords={greekWords ? greekWords : []}
            />
        </>
    )
}
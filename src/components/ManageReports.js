import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import reports from './reports.json';
import { Link } from 'react-router-dom';
import { Divider, Chip, Tooltip } from '@mui/material';
import { useTheme } from '@emotion/react';
import ManageReportPDF from '../layouts/studies/components/ManageReportPDF';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: 24,
  bgcolor: 'background.paper',
};

const style2 = {
  bgcolor: 'color.paper'
}
console.log(style2)


export default function ManageReports(props) {

  const handleOpenManageReports = () => props.setOpenManageReports(true);
  const handleCloseManageReports = () =>  props.setOpenManageReports(false);

  const [selectedReport, setSelectedReport] = React.useState(0);
  
  


  const changeSelectedReport = (index) => {
    document.getElementById('select' + selectedReport).style.background = 'none';
    setSelectedReport(index);
    document.getElementById('select' + index).style.background = 'rgb(45,180,235,0.1)';
  };

  const [darkToggle, setDarkToggle] = React.useState(false);
  React.useEffect(() => {
    setDarkToggle(props.darkToggle);
  }, [props.darkToggle]);


  const theme = useTheme();

  return (
    <div >
      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.openManageReports}
        onClose={handleCloseManageReports}
        closeAfterTransition
        BackdropComponent={Backdrop}
        darkToggle={props.darkToggle}
        BackdropProps={{
          timeout: 500,
        }}
        className="relative  bg-gray-900 bg-opacity-70"

      >
        <Fade in={props.openManageReports}>
          
          <Box  sx={style}  className=" rounded-lg border-transparent p-3 relative dark:bg-[#0c111f] w-[65%] h-3/4  ">
            {/* phone & tablet version */}
            <div className='desktop:hidden'>
              <h1 className='font-semibold pl-2  pb-2  text-gray-300 uppercase dark:text-gray-600 text-xs mb-5'>All reports</h1>
              <div className="w-full flex flex-col align-center">
                <div className="w-[95%] flex flex-col ml-2 mb-2 items-center justify-center">
                  <h1 className='text-primary text-base font-semibold mb-9'>Mme.Delarue - Study ACC542635</h1>
                  <div className='w-full py-3 bg-slate-100 rounded ml-2 mb-4 flex justify-around'>
                    <div className="w-1/12 flex justify-center items-center">
                      <i class="fi fi-rr-file text-gray-500 text-2xl contents "></i>
                    </div>
                    <div className="w-4/6 flex flex-col items-center justify-center">
                      <h1 h1 className='desktop:text-sm text-gray-600 font-medium dark:text-gray-400 text-xs'>Report Cancer Mme.Delarue</h1>
                      <h1 className='text-xs text-gray-400 dark:text-gray-600'>Last Edit : 23/1/2022</h1>
                    </div>
                    <div className="w-1/5 flex items-center justify-center">
                      <button className='bg-primary rounded py-2 shadow-lg text-white text-sm  hover:bg-[rgb(45,180,235,0.6)] w-[60%] '>Edit</button>
                    </div>
                  </div>
                  <div className='w-1/3 py-3 bg-primary rounded ml-2 mb-4 mt-6 flex justify-around shadow-lg'>
                    <h1 className='font-medium'>Add</h1>
                  </div>
                </div>
              </div>
              <div className="absolute right-5 top-2 text-xl">
                <i class="fi fi-rr-cross text-xs cursor-pointer hover:text-primary text-gray-300" onClick={handleCloseManageReports}></i>
              </div>
            </div>

            {/* desktop version */}

            <div className='hidden desktop:block'>
              <div className="absolute w-10 h-10 left-6 bottom-6 shadow-lg bg-primary flex items-center justify-center rounded-full hover:bg-[rgb(45,180,235,0.6)] cursor-pointer">
                <i class="fi fi-rr-plus text-white text-xl mt-1"></i>
              </div>
              <Tooltip title="Close">
                <div className="absolute right-5 top-2 text-xl">
                  <i class="fi fi-rr-cross text-xs cursor-pointer hover:text-primary text-gray-300" onClick={handleCloseManageReports}></i>
                </div>
              </Tooltip>
              <div className="w-full h-full flex ">
                <div className="px-3 py-2 w-[37%] h-[90%]">
                  <div className="flex justify-start items-start ">
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <h1 className='text-sm font-semibold pl-2 pt-2 pb-2  text-gray-300 uppercase dark:text-gray-600'>All reports</h1>
                  </div>
                  {reports.map((report, index) => (
                    <div className="flex items-center my-5 rounded py-1 px-2 cursor-pointer hover:bg-[rgb(45,180,235,0.1)]" id={'select'+[index]} onClick={() => {changeSelectedReport(index)}}>
                      <i class="fi fi-rr-file text-gray-400 text-md mr-3 mt-1"></i>
                      <div className="flex flex-col ">
                        <h1 className='text-sm text-gray-600 font-medium dark:text-gray-400'>Report Cancer Mme.Delarue</h1>
                        <h1 className='text-xs text-gray-400 dark:text-gray-600'>Last Edit : 23/1/2022</h1>
                      </div>
                    </div>
                  ))}            
                </div>
                <div style={{backgroundColor: theme.palette.managereport.bgcolor}} className="h-[95%] w-[98%] flex flex-col rounded-xl mt-4 mr-6">
                  <div className="h-[9%] w-[98%] flex flex-col justify-start items-start pl-9 pt-3 mt-5 ml-2 ">
                    <h1 className='text-lg text-[#95c0d3] font-bold uppercase '>Study {reports[selectedReport].id} </h1>
                    <h1 className='font-medium text-sm text-[#b8d6e4] pb-1 uppercase mb-5'>Report Cancer Mme.Delarue</h1>
                  </div>
                  <div className=" w-[98%] flex items-center justify-around pt-5 mt-8 pl-8 mb-10">
                    {/* <img src="/report_example.png" alt="" className='w-[40%] border border-gray-200 rounded shadow '  /> */}
                    <div className='border border-gray-200 rounded shadow'><ManageReportPDF  /></div>
                    <div className="w-[48%] flex flex-col items-start pl-24">
                      <div className='border-b border-gray-300 h-8 mb-5 w-[95%]'>
                        <h1 className='text-gray-500 dark:text-gray-400 font-semibold text-md mb-5 '> Properties </h1>
                      </div>
                      <h1 className='text-gray-600 my-1'><span className='text-gray-500 dark:text-gray-400  font-medium '>Name : </span>  Report Cancer Mme.Delarue</h1>
                      <h1 className='text-gray-600 my-1'><span className='text-gray-500 dark:text-gray-400  font-medium '>Patient : </span> {reports[selectedReport].name}</h1>
                      <h1 className='text-gray-600 my-1'><span className='text-gray-500 dark:text-gray-400  font-medium '>Version : </span> <Chip label="V.12.56.23.12b.21" variant='outlined' size="small"  color="primary" ></Chip></h1>
                      <h1 className='text-gray-600 my-1'><span className='text-gray-500 dark:text-gray-400  font-medium '>Nb Version : </span> 27</h1>
                      <h1 className='text-gray-600 my-1'><span className='text-gray-500 dark:text-gray-400  font-medium '>Last Edit : </span> 23/07/1996 </h1> 
                      <Link to={'/editReports/ls'} target='_blank'> 
                        <h1 className='bg-primary rounded px-4 py-2 shadow-lg text-white mt-14 hover:bg-[rgb(45,180,235,0.6)] no-underline cursor-pointer'> Edit Report</h1>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
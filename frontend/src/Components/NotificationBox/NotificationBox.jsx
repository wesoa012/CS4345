import IconButton from '@mui/material/IconButton';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import { CurrUserContext } from '../../Context/CurrUserContext';
import { useContext } from 'react';



export const NotificationBox = (props) => {
    const navigate = useNavigate();

    const currUser = useContext(CurrUserContext);

    return (<div id="notification-thingy">

        <div className="OverShield"></div>

        <div className="NotificationBox rounded">
            <div className="col-12">
                <div className="col-12 row m-0 mt-1 p-1">
                    <table>
                        <tbody>
                            <tr className='d-flex flex-row justify-content-between px-3'>
                                <td className=''>
                                    <Tooltip title="Open notifications">

                                        <IconButton aria-label="open"
                                            className=''
                                            onClick={() => currUser.setCurrNotification(currNotification)}
                                            href="/notifications"
                                            sx={{}}>
                                            <OpenInNewIcon centered />
                                        </IconButton>
                                    </Tooltip>

                                </td>
                                <td className=''>
                                    <Tooltip title="Flag as unread">

                                        <IconButton aria-label="flag"
                                            className=''
                                            sx={{}}>
                                            <FlagOutlinedIcon centered />
                                        </IconButton>
                                    </Tooltip>
                                </td>
                                <td className=''>
                                    <Tooltip title="Delete">

                                        <IconButton aria-label="delete"
                                            className=''
                                            onClick={() => currUser.deleteNotification() && console.log("button pushed")}
                                            sx={{}}>
                                            <DeleteIcon centered />
                                        </IconButton>
                                    </Tooltip>
                                </td>
                                <td className=''>
                                    <Tooltip title="Close">

                                        <IconButton aria-label="close"
                                            className='justify-content-center'
                                            onClick={() => { console.log("New currUser currNotif", currUser.currNotification); navigate('/notifications') }}
                                            sx={{}}
                                        >
                                            <ClearRoundedIcon centered />
                                        </IconButton>
                                    </Tooltip>
                                </td>
                            </tr>
                        </tbody>

                    </table>
                </div>

                <table className="m1-3 p-0 position-relative table">
                    <thead>
                        <div className='p-2 border-bottom border-top'>
                            <tr className="col-12 border-0">
                                <th className="p-0 border-0">
                                    {currUser.currNotification.header}
                                </th>
                            </tr>
                        </div>
                    </thead>
                    <tbody>
                        <div className="p-2">
                            <tr className='border-0'>
                                <td className="overflow-auto p-0 border-0">
                                    {currUser.currNotification.message}
                                </td>
                            </tr>
                        </div>
                    </tbody>
                </table>
            </div>

        </div>

    </div >)
}
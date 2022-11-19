import {Fab, Modal, styled, Tooltip} from "@mui/material";
import React, { useState } from 'react';
import { Add as AddIcon } from "@mui/icons-material";
import { Box } from "@mui/system";
import CloseIcon from '@mui/icons-material/Close';

const StyledModal = styled(Modal)({
	display: "flex",
	alignItems: "center",
	justifyContent: "center"
})

const ShowItemModal = () => {
	const [open, setOpen] = useState(true)
return (
<>
{/* <Tooltip title="Close">
	<Fab>
		<CloseIcon />
	</Fab>
</Tooltip> */}
		<StyledModal
			open={open}
			onClose={(e)=> setOpen(false)}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box 
			width={400}
			height={280}
			bgcolor={"background.default"}
			color={"text.primary"}
			p={3}
			borderRadius={5}>
				Hello
				</Box>
		</StyledModal>
</>
)}
export default ShowItemModal;
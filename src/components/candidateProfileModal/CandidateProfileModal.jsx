import { PropaneSharp } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";

function CandidateProfileModal({ showModal, setShowModal, candidateDetails }) {
    return (showModal ?
        <>
            <div>{candidateDetails.name}</div>
        </>
        : <div>No Modal</div>);
}

export default CandidateProfileModal;
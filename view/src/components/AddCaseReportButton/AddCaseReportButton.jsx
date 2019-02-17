import React from "react";
import { Link } from "react-router-dom";
import Button from '../shared/Button/Button'
import './AddCaseReportButton.css';

const AddCaseReportButton = () => {
  return (
    <React.Fragment>
	    <Link to="/addCaseReport">
	        <Button text='Add a case report' icon={['far', 'file-alt']}/>
	    </Link>
    </React.Fragment>
  );
};

export default AddCaseReportButton;
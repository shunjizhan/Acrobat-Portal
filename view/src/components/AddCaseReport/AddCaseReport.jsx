import React, { Component } from "react";
import axios from "axios";

class AddCaseReport extends Component {
  constructor() {
    super();

    this.state = {
      caseReport_txt: "",
      caseReport_ann: "",
      date: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    // const newCaseReport = {
    //   caseReportTitle: this.state.caseReport_txt,
    //   caseReportID: this.state.caseReport_ann,
    //   description: this.state.description,
    //   date: this.state.date,
    // };

    axios.post("http://localhost:3001/api/putCaseReport", {
      txt: this.state.caseReport_txt,
      ann: this.state.caseReport_ann,
      date: this.state.date
    }).then(res => {
      console.log(res);
    });
    // console.log(newCaseReport);
  }

  render() {
    return (
      <div>
        <div >
          <div >
            <div >
              <div >
                <h5 >Create Case Report Form</h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div >
                    <textarea
                      type="text"
                      placeholder="Case Report txt"
                      name="caseReport_txt"
                      value={this.state.caseReport_txt}
                      onChange={this.onChange}
                    />
                  </div>
                  <div >
                    <textarea
                      type="text"
                      placeholder="Case Report ann"
                      name="caseReport_ann"
                      value={this.state.caseReport_ann}
                      onChange={this.onChange}
                    />
                  </div>
                  
                  
                  <h6>Date</h6>
                  <div >
                    <input
                      type="date"
                      name="date"
                      value={this.state.date}
                      onChange={this.onChange}
                    />
                  </div>
                  <input
                    type="submit"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AddCaseReport;

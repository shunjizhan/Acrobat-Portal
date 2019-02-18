import React, { Component } from "react";

class AddCaseReport extends Component {
  constructor() {
    super();

    this.state = {
      caseReportTitle: "",
      caseReportID: "",
      description: "",
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
    const newCaseReport = {
      caseReportTitle: this.state.caseReportTitle,
      caseReportID: this.state.caseReportID,
      description: this.state.description,
      date: this.state.date,
    };

    console.log(newCaseReport);
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
                    <input
                      type="text"
                      placeholder="Case Report Title"
                      name="caseReportTitle"
                      value={this.state.caseReportTitle}
                      onChange={this.onChange}
                    />
                  </div>
                  <div >
                    <input
                      type="text"
                      placeholder="Unique Case Report ID"
                      name="caseReportID"
                      value={this.state.caseReportID}
                      onChange={this.onChange}
                    />
                  </div>
                  <div >
                    <textarea
                      placeholder="Case Report Description"
                      name="description"
                      value={this.state.description}
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

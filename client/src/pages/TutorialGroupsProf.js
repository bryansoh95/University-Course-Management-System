import React, { Component } from "react";
import { Link } from "react-router-dom";
import SideNav from "../components/SideNav";
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  Button
} from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";
import FormA from "../components/FormA";

class TutorialGroupsProf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleTutorialGroups: []
    };
  }

  handleDelete = index => {
    axios
      .post("/course/group/tutorial/delete/current", {
        module_code: this.props.module_code,
        tutorial_group: this.state.moduleTutorialGroups[index].tutorial_group
      })
      .then(res => {
        alert("delete success!");
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    axios
      .get("/course/tutorial/groups")
      .then(res => {
        this.setState({ moduleTutorialGroups: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs="3">
            <SideNav module_code={this.props.module_code} />
          </Col>
          <Col>
            <Row className="mt-5">
              <Col sm={{ size: 5 }}>
                <h1>{this.props.module_code} Tutorial Groups</h1>
              </Col>
              <Col className="mt-2">
                <FormA
                  firstPostRoute="/course/group/tutorial/add"
                  buttonLabel="Add Student"
                  formHeader="Add Student to a Tutorial Group"
                  firstField="Student Number"
                  secondField="Tutorial Group"
                  action="Add"
                  data={{ module_code: this.props.module_code }}
                />
              </Col>
            </Row>
            <ListGroup className="mr-5">
              {this.state.moduleTutorialGroups.map((groups, index) => (
                <ListGroupItem style={{ background: "WhiteSmoke" }}>
                  <Row>
                    <Col>
                      <Link
                        to={{
                          pathname:
                            "/modules/" +
                            this.props.module_code +
                            "/group/tutorial/student",
                          state: {
                            tutorial_group: groups.tutorial_group
                          }
                        }}
                      >
                        <ListGroupItemHeading>
                          Tutorial Group: {groups.tutorial_group}
                        </ListGroupItemHeading>
                      </Link>
                    </Col>
                    <Button
                      color="danger"
                      className="mr-3 mt-1"
                      onClick={() => this.handleDelete(index)}
                    >
                      Delete
                    </Button>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(TutorialGroupsProf);

import MarkdownIt from "markdown-it";
import React, { Component } from "react";
import MdEditor from "react-markdown-editor-lite";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { createNewSpecialty } from "../../../services/userService";
import { upload } from "../../../utils";
import "./ManageSpecialty.scss";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      fileImage: null,
      uploading: false,
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleSaveNewSpecialty = async () => {
    const dataSend = {
      name: this.state.name,
      image: this.state.image,
      descriptionHTML: this.state.descriptionHTML,
      descriptionMarkdown: this.state.descriptionMarkdown,
    };
    let res = await createNewSpecialty(dataSend);
    if (res && res.errCode === 0) {
      let messageNotice =
        this.props.language === "vi"
          ? "Thêm chuyên khoa thành công!"
          : "Add new specialty success";
      toast.success(messageNotice);
      this.setState({
        name: "",
        image: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
        fileImage: null,
        uploading: false,
      });
    } else {
      let messageNotice =
        this.props.language === "vi"
          ? "Thêm chuyên khoa thất bại!"
          : "Something wrongs...";

      toast.error(messageNotice);
    }
  };
  handleUpload = async () => {
    this.setState({ uploading: true });
    const urlImage = await upload(this.state.fileImage);
    this.setState({ image: urlImage });
    this.setState({ uploading: false });
  };

  render() {
    return (
      <div className="manage-specialty-container">
        <div className="ms-title">Quản lý chuyên khoa</div>
        <div className="add-new-specialty row">
          <div className="col-6 form-group">
            <label>Tên chuyên khoa</label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={(event) => this.handleOnChangeInput(event, "name")}
            />
          </div>
          <div className="col-6 form-group">
            <label>Ảnh chuyên khoa</label>
            <input
              type="file"
              className="form-control-file"
              onChange={(event) =>
                this.setState({ fileImage: event.target.files[0] })
              }
            />
            <button onClick={this.handleUpload}>
              {this.state.uploading ? "uploading" : "Upload"}
            </button>
          </div>
          <div className="col-12">
            <MdEditor
              style={{ height: "450px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div>
          <div className="col-12">
            <button
              className="btn-save-specialty"
              onClick={() => this.handleSaveNewSpecialty()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);

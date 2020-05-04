import React from "react";
import NewTicketForm from "./NewTicketForm";
import Question from "./Question.js";
import PropTypes from "prop-types";

class QuestionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionVisible: 1,
      formVisible: false,
    };
  }

  clickNextQuestion = () => {
    this.setState((prevState) => ({
      questionVisible: prevState.questionVisible + 1,
    }));
  };

  setFormVisibility = () => {
    this.setState((prevState) => ({
      formVisible: !prevState.formVisible,
    }));
  };

  displayQuestion = () => {
    if (this.state.questionVisible % 3 === 1) {
      return {
        question:
          "Have you gone through all the steps on the Learn How to Program debugging lesson?",
        function: this.clickNextQuestion,
      };
    } else if (this.state.questionVisible % 3 === 2) {
      return {
        question: "Have you asked another pair for help?",
        function: this.clickNextQuestion,
      };
    } else if (this.state.questionVisible % 3 === 0) {
      return {
        question:
          "Have you spent 15 minutes going through through the problem documenting every step?",
        function: this.setFormVisibility,
      };
    }
  };

  setVisibility = () => {
    if (this.state.formVisible) {
      console.log("What is in the props function?");
      console.log(this.props.onNewTicketFormSubmission);
      return {
        component: (
          <NewTicketForm
            onNewTicketFormSubmission={this.props.onNewTicketFormSubmission}
          />
        ),
      };
    } else {
      let currentQuestion = this.displayQuestion();
      return {
        component: (
          <Question
            question={currentQuestion.question}
            function={currentQuestion.function}
          />
        ),
      };
    }
  };

  render() {
    let currentlyVisibleState = this.setVisibility();
    return <React.Fragment>{currentlyVisibleState.component}</React.Fragment>;
  }
}

QuestionScreen.propTypes = {
  onNewTicketFormSubmission: PropTypes.func,
};

export default QuestionScreen;

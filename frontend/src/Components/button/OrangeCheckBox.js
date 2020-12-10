import React from "react";
import styled, { css } from "styled-components";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";

const OrangeBox = withStyles({
  root: {
    color: "#a5a4a4",

    "&$checked": {
      color: "#E16A49",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const StyledFormControlLabel = withStyles({
  root: {
    border: "2px solid #a5a4a4",

    padding: "10px",
    paddingLeft: "0px",
    borderRadius: "5px",
    marginLeft: "15px",
    flex: "1",
  },
})((props) => <FormControlLabel {...props} />);

const OrangeCheckBox = ({ item, onChange, outline, common }) => {
  const { content, survey_question_pk, state } = item;
  return (
    content && (
      <AddCheck
        control={
          common ? (
            <OrangeBox
              name={content}
              checked={state}
              onChange={() => onChange()}
            />
          ) : (
            <OrangeBox
              name={content}
              checked={state}
              onChange={() => onChange(survey_question_pk)}
            />
          )
        }
        outline={outline}
        label={content}
      />
    )
  );
};

export default OrangeCheckBox;

const AddCheck = styled(StyledFormControlLabel)`
  ${(props) =>
    props.outline &&
    css`
      color: #e16a49 !important;
      border: 2px solid #e16a49 !important;
    `}
`;

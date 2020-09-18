import React from "react";

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

const OrangeCheckBox = ({ item, onChange }) => {
  const { content, survey_question_pk, state } = item;
  return (
    <FormControlLabel
      control={
        <OrangeBox
          name={content}
          checked={state}
          onChange={() => onChange(survey_question_pk)}
        />
      }
      label={content}
    />
  );
};

export default OrangeCheckBox;

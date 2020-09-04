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
  return (
    <FormControlLabel
      control={
        <OrangeBox
          name={item.name}
          checked={item.state}
          onChange={() => onChange(item.id)}
        />
      }
      label={item.name}
    />
  );
};

export default OrangeCheckBox;

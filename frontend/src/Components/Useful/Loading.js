import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <StyledCircularProgress size={200} variant="static" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <StyledTypography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</StyledTypography>
      </Box>
      <Box
        top={0}
        left={0}
        bottom={-350}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <StyledWaitMsg>잠시만 기다려 주세요</StyledWaitMsg>
      </Box>
    </Box>
  );
}

function Loading() {
  const [progress, setProgress] = useState(0);
  // 현재 1초 로딩용
  // useEffect(() => {
  //   if (progress === 99) {
  //     return;
  //   }
  //   setTimeout(() => {
  //     setProgress(progress + 1);
  //   }, 10);
  // }, [progress]);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 9
      );
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <StyledMainInfo>답변 내용을</StyledMainInfo>
      <StyledMainInfo2>분석하고 있습니다.</StyledMainInfo2>
      <StyledSubInfo>
        닥터핏은 입력하신 정보를 통해 <br />
        수의영양에 기반한 맞춤영양제를 추천합니다.
      </StyledSubInfo>

      <StyledLoaderWrapper>
        <CircularProgressWithLabel value={progress} />
      </StyledLoaderWrapper>
    </>
  );
}

export default React.memo(Loading);

// info

const StyledMainInfo = styled.div`
  margin: 25px 0 10px;
  font-size: 28px;
  font-weight: 300;
  color: #333333;
  letter-spacing: -1.4px;
`;

const StyledMainInfo2 = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #333333;
  letter-spacing: -1.4px;
`;

const StyledSubInfo = styled.div`
  font-size: 15px;
  color: #080808;
  letter-spacing: -0.75px;
  line-height: 1.47;
  margin: 15px 0 50px;
`;

// loader & spinner

const StyledLoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledCircularProgress = withStyles({
  colorPrimary: {
    color: "#E16A49",
  },
  svg: {
    strokeLinecap: "round",
  },
})(CircularProgress);

const StyledTypography = withStyles({
  caption: {
    fontSize: "48px",
    color: "#333333",
  },
})(Typography);

const StyledWaitMsg = styled.div`
  text-align: center;
  font: normal normal 300 22px/33px Noto Sans KR;
  letter-spacing: -1.1px;
  color: #080808;
  opacity: 1;
`;

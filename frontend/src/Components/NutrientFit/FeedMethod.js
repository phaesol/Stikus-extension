import React from 'react';
import { ReactComponent as UseFeed } from "../../Images/Basic/use-feed.svg";
import { ReactComponent as UseMix } from "../../Images/Basic/use-mix.svg";
const FeedMethod = () => {
    return (
      <>
        <div>
          <UseMix />
          동봉된 빈용기에
          <br /> 원료를 혼합
        </div>
        <div>
          <UseFeed />
          동봉된 스푼(1회 분)
          <br /> 1일 2회 급여
        </div>
      </>
    );
};

export default FeedMethod;
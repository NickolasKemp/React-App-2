import React from 'react';
import SingleBoardPageHeader from '../SingleBoardPageHeader';
import Lists from '../Lists';
import { useParams, useSearchParams } from 'react-router-dom';

const SingleBoardPage = () => {

  return (
    <div>
      <SingleBoardPageHeader/>
      <Lists/>
    </div>
  );
};

export default SingleBoardPage;
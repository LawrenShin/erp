import React from 'react';
import { FlapperSpinner } from "react-spinners-kit";
import styled from 'styled-components';

export default styled(({className, ...rest}) => (
    <div className={className} {...rest}>
        <FlapperSpinner color="#4892BC" />
    </div>    
    
))`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
`;
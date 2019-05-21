import React from 'react';
import { FlapperSpinner } from "react-spinners-kit";
import styled from 'styled-components';

export default styled(({className, ...rest}) => (
    <div className={className} {...rest}>
        <div className="spinner">
        </div>
    </div>    
    
))`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    opacity: 0;
`;
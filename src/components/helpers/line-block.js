import React from 'react';
import styled from 'styled-components';

export default styled(({className, title, children, ...rest}) => (
    <div className={className} title={title} {...rest}>{children}</div>
    
))`
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    white-space: nowrap;
    align-self: flex-start;
    text-align: left;
`;
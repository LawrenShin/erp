import React from 'react';
import {Message} from 'semantic-ui-react';

export default ({children, error}) => <Message color='red' className='info'>Wrong password or username.</Message>;
    // <Message info color='red'
    // header='Wrong password or username.'>
        {/* <Message.Header>{error ? error.toString() :  null}{children}</Message.Header> */}
    {/* </Message> */}
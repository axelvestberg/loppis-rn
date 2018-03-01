import React from 'react';
import { Button } from 'react-native';


const fetchUserPlaces = props => {
    return(
        <Button title="Get User Places" onPress={props.onGetUserPlaces} />   
    );
};


export default fetchUserPlaces;
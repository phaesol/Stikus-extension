import React from 'react';
import InfoFitMain from '../Service/InfoFit/InfoFitMain';
// import { connect } from 'react-redux';

function InfoFitMainContainer () {    
    return (
        <> 
        <InfoFitMain /> 
        </>
    )
}


// const mapStateToProps = state => {
//     return { 
//         user: state.user,
//         petInfo: state.petInfo 
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return { 
//         dispatchPetInfo: {
//             dispatchSetPetID: id => dispatch(setPetID(id)),
//             dispatchSetPetInfo : (owner, name, age, weight, body_format, kind, activity, breed, sex, neutralization) => dispatch(setPetInfo(owner, name, age, weight, body_format, kind, activity, breed, sex, neutralization)),
//             dispatchSetPetImage : image => dispatch(setPetImage(image))
//         }
//     }
// }

export default React.memo(InfoFitMainContainer);

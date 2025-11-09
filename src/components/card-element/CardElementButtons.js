import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@components/button/Button';

const CardElementButtons = (isChecked, btnTextOne, btnTextTwo, onClickBtnOne, onClickBtnTwo, onNavigateToProfile) => {
  return (
    <div className="card-elemrnt-buttons" data-testid="card-element-buttons">
      <Fragment>
        {!isChecked && (
          <Button label={btnTextOne} className="card-element-buttons-btn button" handleClcik={onClickBtnOne} />
        )}
        {!isChecked && (
          <Button
            label={btnTextTwo}
            className="card-element-buttons-btn button isUserFollowed"
            handleClcik={onClickBtnTwo}
          />
        )}
      </Fragment>
      <Button label="Profile" className="card-element-buttons-btn-button" handleClick={onNavigateToProfile} />
    </div>
  );
};

CardElementButtons.propTypes = {
  isChecked: PropTypes.bool,
  btnTextOne: PropTypes.string,
  btnTextTwo: PropTypes.string,
  onClickBtnOne: PropTypes.func,
  onClickBtnTwo: PropTypes.func,
  onNavigateToProfile: PropTypes.func
};

export default CardElementButtons;

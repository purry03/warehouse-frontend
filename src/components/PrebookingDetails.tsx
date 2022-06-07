import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './PrebookingDetails.css';

function PrebookingDetails(props) {
  const { details, onApprove, onCancel } = props;

  return (
    <>
      {
        details.username && (
          <div className="verifyprebooking-wrapper">

            <h4>Prebooking Details</h4>

            <table>
              <thead>
                <tr>
                  <th>
                    Name
                  </th>
                  <th>
                    Product
                  </th>
                  <th>
                    Price
                  </th>
                  <th>
                    Quantity
                  </th>
                  <th>
                    Total Price
                  </th>
                  <th>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {details.username}
                  </td>
                  <td>
                    {details.productTitle}
                  </td>
                  <td>
                    {details.productPrice}
                  </td>
                  <td>
                    {details.quantity}
                  </td>
                  <td>
                    {details.productPrice * details.quantity}
                  </td>
                  <td className="actions-wrapper">
                    <button type="button" onClick={onApprove}>Approve</button>
                    <button type="button" onClick={onCancel}>Cancel</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      }
    </>
  );
}

PrebookingDetails.propTypes = {
  details: PropTypes.shape({
    username: PropTypes.string.isRequired,
    productTitle: PropTypes.string.isRequired,
    productPrice: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onApprove: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default PrebookingDetails;

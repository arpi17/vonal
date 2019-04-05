import React from 'react';
import ReactDOM from 'react-dom';

import Modal from './Modal';
import ModalOverlay from './ModalOverlay';
import FlexRow from '../layout/FlexRow';
import CloseButton from './CloseButton';

function CreateInfoModal({ isOpen, onClose }) {
  return isOpen
    ? ReactDOM.createPortal(
        <ModalOverlay onClick={onClose}>
          <div
            style={{ position: 'absolute', top: '50px', width: '100%' }}
            onClick={onClose}
          >
            <Modal>
              <FlexRow>
                <h2>How to create a route?</h2>
                <CloseButton onClick={onClose}>&times;</CloseButton>
              </FlexRow>
              <ol>
                <li>
                  Use the serach bar or click the geoloacator icon to zoom to a
                  place on the map
                </li>
                <li>
                  Once you have zoomed in enough the drawing tool will appear on
                  the right side of the map
                </li>
                <li>
                  Click on the dotted-line icon (above the trash icon) to start
                  drawing
                </li>
                <li>
                  If you are finished with drawing simply click on the last
                  point you placed
                </li>
                <li>
                  Once a route is created you can submit it. A title is required
                  for every route but you can add additional information
                </li>
                <li>
                  To modify the route click on a point first to select it then
                  drag it to its new place
                </li>
                <li>
                  To delete a selected point click on the trash icon on the
                  right. To delete the whole route click on a dashed line
                  segment then click on the trash icon
                </li>
              </ol>
            </Modal>
          </div>
        </ModalOverlay>,
        document.getElementById('modal')
      )
    : null;
}

export default CreateInfoModal;

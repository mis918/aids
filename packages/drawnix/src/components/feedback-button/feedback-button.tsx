/**
 * FeedbackButton Component
 *
 * A circular feedback button positioned at the bottom-right of the canvas.
 * Shows a QR code image on click for user feedback.
 */

import React, { useState } from 'react';
import { PopoverTrigger } from '../popover/popover';
import { useBoard } from '@plait-board/react-board';
import { PlaitBoard } from '@plait/core';
import { Z_INDEX } from '../../constants/z-index';
import { WeComIcon } from '../icons';
import { ToolButton } from '../tool-button';
import './feedback-button.scss';

const QR_CODE_URL = 'https://i.imgs.ovh/2026/01/20/yAvy6M.th.png';

const WeComIconComponent: React.FC = () => (
  <span className="feedback-button__icon">{WeComIcon}</span>
);

export const FeedbackButton: React.FC = () => {
  const board = useBoard();
  const container = PlaitBoard.getBoardContainer(board);
  const [open, setOpen] = useState(false);

  return (
    <>
      <PopoverTrigger asChild>
        <ToolButton
          type="icon"
          icon={<WeComIconComponent />}
          aria-label="客服微信"
          title="客服微信"
          selected={open}
          onClick={() => setOpen((v) => !v)}
        />
      </PopoverTrigger>

      {open && (
        <div
          className="feedback-qrcode-float"
          style={{
            position: 'absolute',
            right: '48px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: Z_INDEX.POPOVER_FEEDBACK
          }}
          ref={(el) => {
            if (el && container) {
              container.appendChild(el);
            }
          }}
        >
          <div className="feedback-qrcode-content">
            <img
              src={QR_CODE_URL}
              alt="客服微信"
              className="feedback-qrcode-image"
            />
            <div className="feedback-qrcode-text">
              扫码反馈意见
            </div>
          </div>
        </div>
      )}
    </>
  );
};

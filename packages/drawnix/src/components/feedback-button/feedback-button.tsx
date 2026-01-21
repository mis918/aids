/**
 * FeedbackButton Component
 *
 * A circular feedback button positioned at the bottom-right of the canvas.
 * Shows a QR code image on click for user feedback.
 */

import React, { useState } from 'react';
import { WeComIcon } from '../icons';
import { ToolButton } from '../tool-button';

const QR_CODE_URL = 'https://i.imgs.ovh/2026/01/20/yAvy6M.th.png';

export const FeedbackButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ToolButton
        type="icon"
        icon={<span>{WeComIcon}</span>}
        title="客服微信"
        onClick={() => setOpen(v => !v)}
      />

      {open && (
        <div
          style={{
            position: 'fixed',
            top: 120,
            right: 120,
            padding: 12,
            background: '#fff',
            border: '1px solid #ccc',
            zIndex: 999999
          }}
        >
          <img
            src={QR_CODE_URL}
            alt="微信二维码"
            style={{ width: 160, height: 160 }}
          />
          <div>扫码反馈意见</div>
        </div>
      )}
    </>
  );
};

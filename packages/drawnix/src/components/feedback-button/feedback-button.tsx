/**
 * FeedbackButton Component
 *
 * A circular feedback button positioned at the bottom-right of the canvas.
 * Shows a QR code image on click for user feedback.
 */

import React, { useRef, useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { WeComIcon } from '../icons';
import { ToolButton } from '../tool-button';
import { Z_INDEX } from '../../constants/z-index';
import './feedback-button.scss';

const QR_CODE_URL = 'https://i.imgs.ovh/2026/01/20/yAvy6M.th.png';

const WeComIconComponent: React.FC = () => (
  <span className="feedback-button__icon">{WeComIcon}</span>
);

export const FeedbackButton: React.FC = () => {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);

  // ✅ 每次打开时，计算按钮在“视口中的真实位置”
  useLayoutEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top + rect.height / 2,
        left: rect.left
      });
    }
  }, [open]);

  return (
    <>
      <div ref={buttonRef}>
        <ToolButton
          type="icon"
          icon={<WeComIconComponent />}
          aria-label="客服微信"
          title="客服微信"
          selected={open}
          onClick={() => setOpen(v => !v)}
        />
      </div>

      {open && position &&
        createPortal(
          <div
            className="feedback-qrcode-float"
            style={{
              position: 'fixed',
              top: position.top,
              left: position.left - 180,
              transform: 'translateY(-50%)',
              zIndex: Z_INDEX.POPOVER_FEEDBACK
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
          </div>,
          document.body
        )
      }
    </>
  );
};

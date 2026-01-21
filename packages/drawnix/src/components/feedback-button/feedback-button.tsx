/**
 * FeedbackButton Component
 *
 * A circular feedback button positioned at the bottom-right of the canvas.
 * Shows a QR code image on click for user feedback.
 */

import React, { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../popover/popover';
import { useBoard } from '@plait-board/react-board';
import { PlaitBoard } from '@plait/core';
import { Z_INDEX } from '../../constants/z-index';
import { WeComIcon } from '../icons';
import { ToolButton } from '../tool-button';
import './feedback-button.scss';

const QR_CODE_URL = 'https://i.imgs.ovh/2026/01/21/yRkDdF.png';

// 企业微信图标组件
const WeComIconComponent: React.FC = () => (
  <span className="feedback-button__icon">{WeComIcon}</span>
);

export const FeedbackButton: React.FC = () => {
  const board = useBoard();
  const container = PlaitBoard.getBoardContainer(board);
  const [open, setOpen] = useState(false);

  // 预加载图片
  useEffect(() => {
    const img = new Image();
    img.src = QR_CODE_URL;
  }, []);

  return (
    <Popover placement="right-end" sideOffset={12} open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <ToolButton
          type="icon"
          icon={<WeComIconComponent />}
          aria-label="微信客服"
          title="微信客服"
          tooltipPlacement="right"
          selected={open}
          visible={true}
          data-track="toolbar_click_feedback"
          onPointerDown={(e) => {
            e.event.stopPropagation();
          }}
          onClick={() => setOpen(!open)}
        />
      </PopoverTrigger>
      <PopoverContent container={container} style={{ zIndex: Z_INDEX.POPOVER_FEEDBACK }}>
        <div className="feedback-qrcode-content">
          <img
            src={QR_CODE_URL}
            alt="微信客服二维码"
            className="feedback-qrcode-image"
          />
          <div className="feedback-qrcode-text">扫码添加微信</div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

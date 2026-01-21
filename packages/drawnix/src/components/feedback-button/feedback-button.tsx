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

// 更新为上传的二维码图片地址
const QR_CODE_URL = 'https://i.imgs.ovh/2026/01/20/yAvy6M.th.png';  // 使用上传的二维码图像

// 企业微信图标组件
const WeComIconComponent: React.FC = () => (
  <span className="feedback-button__icon">{WeComIcon}</span>
);

export const FeedbackButton: React.FC = () => {
  const board = useBoard();
  const container = PlaitBoard.getBoardContainer(board);
  const [open, setOpen] = useState(false);

  // 预加载二维码图像
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
          aria-label="客服微信"
          title="客服微信"
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
          {/* 只在 Popover 打开时渲染二维码 */}
          {open && (
            <img
              key={Date.now()} // 每次重新渲染，避免缓存问题
              src={QR_CODE_URL}
              alt="客服微信"
              className="feedback-qrcode-image"
            />
          )}
          <div className="feedback-qrcode-text">扫码反馈意见</div>
        </div>
      </PopoverContent>
    </Popover>
  );
};


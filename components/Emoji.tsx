import { EmojiData, EmojiImage } from 'emoji-data-ts';
import { ReactElement, PropsWithChildren } from 'react';
import { EmojiVendor } from '@constants/Enums';

function EmojiImg({
  emoji,
  tooltip,
  emojiVersion,
  vendor,
}: {
  emoji: EmojiImage;
  tooltip: string;
  vendor: EmojiVendor;
  emojiVersion: string;
}) {
  return (
    <span
      style={{
        backgroundImage: `url(https://unpkg.com/emoji-datasource-${vendor}@${emojiVersion}/img/${vendor}/sheets-256/64.png)`,
        backgroundPosition: `${emoji.x}% ${emoji.y}%`,
        backgroundSize: `${emoji.sheetSizeX}% ${emoji.sheetSizeY}%`,
        display: 'inline-block',
        height: '24px',
        width: '24px',
      }}
      title={tooltip}
    />
  );
}

/**
 * The props type for [[`Emoji`]].
 */
export interface EmojiProps {
  text: undefined | string;
}

/**
 * Convert slack emoji text to image.
 * @category Component
 */
export const Emoji = ({
  text,
}: PropsWithChildren<EmojiProps>): ReactElement => {
  if (!text) return <></>;
  text = text.replaceAll(':', '');
  const eData = new EmojiData();

  const emojiImage = eData.getImageData(text);

  if (emojiImage == null) {
    return <span />;
  }
  return (
    <EmojiImg
      emoji={emojiImage}
      tooltip={text}
      emojiVersion={eData.currentVersion}
      vendor={EmojiVendor.Apple}
    />
  );
};

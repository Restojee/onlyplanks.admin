import React, { useState } from "react";
import { Popup } from "./Popup";
import { Button } from "@common/components/Button";
import { Column } from "@common/components/Layout";
import { Typography } from "@ui/Typography";
import { PopupPosition } from "@ui/Popup";

export const PopupExample: React.FC = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const openPopup = () => setPopupVisible(true);
  const closePopup = () => setPopupVisible(false);

  return (
    <Column>
      <Popup
        isVisible={isPopupVisible}
        onClose={closePopup}
        anchor={<Button onClick={openPopup}>Открыть попап</Button>}
        header={<Typography>Заголовок попапа</Typography>}
        footer={<Typography>Футер попапа</Typography>}
        width={300}
        position={PopupPosition.BOTTOM}
        closeOnScroll
      >
        <Typography>Это содержимое попапа. Здесь может быть любой контент.</Typography>
      </Popup>
    </Column>
  );
}; 

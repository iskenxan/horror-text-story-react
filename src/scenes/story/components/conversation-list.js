import React from 'react';
import _ from 'lodash';
import { MessageList, Message, MessageText, MessageGroup, Bubble } from '@livechat/ui-kit'
import timestamp from 'time-stamp';

const rootListStyle = {
  maxHeight: 300,
  minHeight: 300,
  backgroundColor: '#F9F9F9'
};


const renderMessages = (dialog, characters) => {
  if (characters && !_.isEmpty(characters)) {
    let dialogArray = Object.values(dialog)
    dialogArray = _.orderBy(dialogArray, 'timestamp')
    console.log(dialogArray)
    return dialogArray.map(message => {
      let name = message.name
      if (name === 'Other') {
        const otherChars = Object.keys(characters).filter(key => key !== 'User')
        name = otherChars[0]
      }
      const character = characters[name]
      const isMain = character && (character.isMain === 'true' || character.isMain === true)
      return (
        <MessageGroup key={message.timestamp}>
          <Message  isOwn={isMain} key={message.timestamp} authorName={name}>
            <Bubble isOwn={isMain} style={{ backgroundColor: character.color || '#bdbdbd', color: (isMain && '#fff') || '#000'}}>
              <MessageText>
                {message.text}
              </MessageText>
            </Bubble>
          </Message>
        </MessageGroup>
      )
    });
  }
};


const ConversationList = ({ dialog, characters }) => {
  return(
      <div style={rootListStyle}>
        { dialog && !_.isEmpty(dialog) &&
          <MessageList active style={{ backgroundColor: '#F9F9F9', maxHeight: 300, minHeight: 300 }}>
            {renderMessages(dialog, characters)}
          </MessageList>
        }
      </div>
  )
};



export default (ConversationList)
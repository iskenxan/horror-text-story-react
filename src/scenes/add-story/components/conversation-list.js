import React from 'react';
import _ from 'lodash';
import { MessageList, Message, MessageText, MessageGroup, Bubble } from '@livechat/ui-kit'

const rootListStyle = {
  maxHeight: 300,
  minHeight: 300,
  backgroundColor: '#F9F9F9'
};


const renderMessages = (dialog, characters) => {
  if (characters && !_.isEmpty(characters)) {
    return _.map(dialog, (value, key) => {
      return (
        <MessageGroup key={key}>
          <Message  isOwn={characters[value.name].isMain} key={key} authorName={value.name}>
            <Bubble isOwn={characters[value.name].isMain} style={{ backgroundColor: characters[value.name].color, color: '#fff'}}>
              <MessageText>
                {value.text}
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
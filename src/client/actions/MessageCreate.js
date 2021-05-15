'use strict';

const Action = require('./Action');
const {
  Events
} = require('../../util/Constants');

class MessageCreateAction extends Action {
  async handle(data) {
    const client = this.client;

    let messageData = {
      id: data.id,
      timestamp: data.timestamp,
      mentions: data.mentions,
      author: data.author,
      content: data.content,
      guild: {
        id: data.guild_id
      },
      channel: await client.channels.fetch(data.channel_id)
    }

    /**
     * Emitted whenever a message is created.
     * @event Client#message
     * @param {Message} message The created message
     */

    client.emit("MESSAGE", messageData);

  }
}

module.exports = MessageCreateAction;
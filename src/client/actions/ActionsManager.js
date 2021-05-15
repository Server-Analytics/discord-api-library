'use strict';

class ActionsManager {
  constructor(client) {
    this.client = client;

    this.register(require('./MessageCreate'));
    this.register(require('./MessageDelete'));
    this.register(require('./MessageDeleteBulk'));
    this.register(require('./MessageReactionAdd'));
    this.register(require('./MessageReactionRemove'));
    this.register(require('./MessageReactionRemoveAll'));
    this.register(require('./MessageReactionRemoveEmoji'));
    this.register(require('./ChannelCreate'));
    this.register(require('./ChannelDelete'));
    this.register(require('./GuildDelete'));
    this.register(require('./GuildMemberRemove'));
    this.register(require('./VoiceStateUpdate'));
  }

  register(Action) {
    this[Action.name.replace(/Action$/, '')] = new Action(this.client);
  }
}

module.exports = ActionsManager;
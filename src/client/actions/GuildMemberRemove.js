'use strict';

const Action = require('./Action');
const {
  Events,
  Status
} = require('../../util/Constants');

class GuildMemberRemoveAction extends Action {
  handle(data, shard) {
    const client = this.client;
    const guild = client.guilds.cache.get(data.guild_id);
    if (guild) {

      guild.memberCount--;

      /**
       * Emitted whenever a member leaves a guild, or is kicked.
       * @event Client#guildMemberRemove
       * @param {GuildMember} member The member that has left/been kicked from the guild
       */
      client.emit(Events.GUILD_MEMBER_REMOVE, {
        userId: data.user_id,
        guildId: data.guild_id
      });

      guild.voiceStates.cache.delete(data.user.id);

    }
    return {
      guild
    };
  }
}

module.exports = GuildMemberRemoveAction;
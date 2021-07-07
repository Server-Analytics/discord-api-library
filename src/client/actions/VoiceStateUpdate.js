'use strict';

const Action = require('./Action');
const {
  Events
} = require('../../util/Constants');
const Structures = require('../../util/Structures');

class VoiceStateUpdate extends Action {
  handle(data) {
    const client = this.client;
    const guild = client.guilds.cache.get(data.guild_id);
    if (guild) {
      const VoiceState = Structures.get('VoiceState');
      // Update the state
      const oldState = guild.voiceStates.cache.has(data.user_id) ?
        guild.voiceStates.cache.get(data.user_id)._clone() :
        new VoiceState(guild, {
          user_id: data.user_id
        });

      const newState = guild.voiceStates.add(data);

      let stateUpdateType = "";

      if (oldState.channelID && data.channel_id) return;
      else if (oldState.channelID == null) stateUpdateType = "joined";
      else stateUpdateType = "left"

      /**
       * Emitted whenever a member changes voice state - e.g. joins/leaves a channel, mutes/unmutes.
       * @event Client#voiceStateUpdate
       * @param {VoiceState} oldState The voice state before the update
       * @param {VoiceState} newState The voice state after the update
       */
      client.emit(Events.VOICE_STATE_UPDATE, stateUpdateType, {
        userId: data.user_id,
        guildId: data.guild_id
      });
    }
  }
}

module.exports = VoiceStateUpdate;
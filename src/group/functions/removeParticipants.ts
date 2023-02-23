/*!
 * Copyright 2021 WPPConnect Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { WPPError } from '../../util';
import { Wid } from '../../whatsapp';
import * as wa_functions from '../../whatsapp/functions';
import { ensureGroupAndParticipants } from './ensureGroupAndParticipants';

/**
 * Remove participants of a group
 *
 * @example
 * ```javascript
 * // One member
 * await WPP.group.removeParticipants('123456@g.us', '123456@c.us');
 *
 * // More than one member
 * await WPP.group.removeParticipants('123456@g.us', ['123456@c.us','123456@c.us']);
 * ```
 *
 * @category Group
 */
export async function removeParticipants(
  groupId: string | Wid,
  participantsIds: (string | Wid) | (string | Wid)[]
): Promise<void> {
  const { groupChat, participants } = await ensureGroupAndParticipants(
    groupId,
    participantsIds
  );

  if (
    participants.some(
      (p) => !groupChat.groupMetadata?.participants.canRemove(p)
    )
  ) {
    throw new WPPError(
      'group_participant_is_not_a_group_member',
      `Group ${groupChat.id._serialized}: Group participant is not a group member`
    );
  }

  return wa_functions.removeParticipants(groupChat, participants);
}

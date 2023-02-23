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

import { Wid } from '../../whatsapp';
import { ensureGroup } from './';

/**
 * Check if your account is allowed to add new participants
 *
 * @example
 * ```javascript
 * const result = await WPP.group.canAdd('group@g.us');
 * console.log(result);
 * ```
 *
 * @category Group
 */
export async function canAdd(groupId: string | Wid) {
  const groupChat = await ensureGroup(groupId);
  return groupChat.groupMetadata!.participants.canAdd();
}

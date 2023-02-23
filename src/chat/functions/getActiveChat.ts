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

import { ChatStore } from '../../whatsapp';

/**
 * Return the current active chat
 *
 * @returns The currenct active chat or undefined for none
 *
 * @example
 * ```javascript
 * // Get active chat
 * const chat = WPP.chat.getActiveChat();
 *
 * WPP.chat.sendTextMessage(chat.id, 'Hi');
 * ```
 * @category Chat
 */
export function getActiveChat() {
  const chat = ChatStore.findFirst((c) => c.active);

  return chat;
}

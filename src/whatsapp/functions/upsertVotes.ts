/*!
 * Copyright 2022 WPPConnect Team
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

import { exportModule } from '../exportModule';
import { MsgKey, Wid } from '../misc';

export interface VoteData {
  ack: number;
  msgKey: MsgKey;
  parentMsgKey: MsgKey;
  selectedOptionLocalIds: number[];
  sender: Wid;
  senderTimestampMs: number;
}
/**
 * @whatsapp 479261
 * @whatsapp 479261 >= 2.2230
 */
export declare function upsertVotes(args: VoteData[]): Promise<any>;

exportModule(
  exports,
  {
    upsertVotes: 'upsertVotes',
  },
  (m) => m.upsertVotes
);

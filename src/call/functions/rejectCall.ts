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
import { CallModel, CallStore } from '../../whatsapp';
import { CALL_STATES } from '../../whatsapp/enums';
import { sendCallSignalingMsg } from '../../whatsapp/functions';

/**
 * Reject a incoming call
 *
 * @example
 * ```javascript
 * // Reject any incoming call
 * WPP.call.rejectCall();
 *
 * // Reject specific call id
 * WPP.call.rejectCall(callId);
 *
 * // Reject any incoming call
 * WPP.on('call.incoming_call', (call) => {
 *   WPP.call.rejectCall(call.id);
 * });
 * ```
 *
 * @param   {string}  callId  The call ID, empty to reject the first one
 * @return  {[type]}          [return description]
 */
export async function rejectCall(callId?: string): Promise<boolean> {
  let call: CallModel | undefined = undefined;

  if (callId) {
    call = CallStore.get(callId);
  } else {
    // First incoming ring or call group
    call = CallStore.findFirst(
      (c) => c.getState() === CALL_STATES.INCOMING_RING || c.isGroup
    );
  }

  if (!call) {
    throw new WPPError(
      'call_not_found',
      `Call ${callId || '<empty>'} not found`,
      {
        callId,
      }
    );
  }

  if (call.getState() !== 'INCOMING_RING' && !call.isGroup) {
    throw new WPPError(
      'call_is_not_incoming_ring',
      `Call ${callId || '<empty>'} is not incoming ring`,
      {
        callId,
        state: call.getState(),
      }
    );
  }

  await sendCallSignalingMsg({
    common: {
      peer_jid: call.peerJid.toString(),
    },
    payload: [
      'reject',
      {
        'call-id': call.id,
        'call-creator': call.peerJid.toString({ legacy: true }),
        count: '0',
      },
      null,
    ],
  });

  return true;
}

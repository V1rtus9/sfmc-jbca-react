/*
 * Copyright (c) V1rtus9
 * Licensed under the MIT License.
 */

export const rejectTimer = (fn: () => void, timeout: number = 1500): number  => setTimeout(() => fn(), timeout);
import uuid from 'uuid';

export default function getUniqueId() {
  return uuid.v4();
};
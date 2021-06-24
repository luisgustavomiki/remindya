import 'reflect-metadata';
import Container from 'typedi';
import { BroadcastReminderHandler } from './handlers/broadcast-reminder';
import { CreateReminderHandler } from './handlers/create-reminder';
import { Scheduler } from './wrappers/scheduler';
import { Socket } from './wrappers/socket';

(async function bootstrap() {
  const socket = Container.get(Socket);
  socket.boostrap();

  const scheduler = Container.get(Scheduler);
  await scheduler.bootstrap();

  const crh = Container.get(CreateReminderHandler);
  const brh = Container.get(BroadcastReminderHandler);

  socket.addHandler('create-reminder', crh.execute.bind(crh));
  scheduler.addHandler(brh.execute.bind(brh));
})();

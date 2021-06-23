import 'reflect-metadata';
import Container from 'typedi';
import { CreateReminderAction } from './actions/create-reminder';
import { Handler } from './handler';
import { Scheduler } from './scheduler';

(async function bootstrap() {
  const handler = Container.get(Handler);
  handler.boostrap();

  const scheduler = Container.get(Scheduler);
  await scheduler.bootstrap();

  handler.action('create-reminder', Container.get(CreateReminderAction).execute);
})();

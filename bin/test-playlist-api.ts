#!/usr/bin/env node
import * as core from '@aws-cdk/core';
import { TestPlaylistApiStack } from '../lib/test-playlist-api-stack';

const app = new core.App();
new TestPlaylistApiStack(app, 'TestPlaylistApiStack');

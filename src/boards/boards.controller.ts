import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Board } from './boards.entity';
import { BoardStatus } from './boards.enum';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('Board');
  constructor(private boardsService: BoardsService) {}

  // 특정 게시물 조회
  @Get('/:id')
  getBoardById(@GetUser() user: User, @Param('id') id: number): Promise<Board> {
    this.logger.verbose(`User ${user.username} trying to get board ${id}`);
    return this.boardsService.getBoardById(id);
  }

  // 게시물 생성
  @Post()
  createBoard(
    @GetUser() user: User,
    @Body() createBoardDto: CreateBoardDto,
  ): Promise<Board> {
    this.logger.verbose(
      `User ${user.username} creating a new board. Payload: ${JSON.stringify(
        createBoardDto,
      )}`,
    );
    return this.boardsService.createBoard(createBoardDto);
  }

  // 게시물 삭제
  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id): Promise<void> {
    return this.boardsService.deleteBoard(id);
  }

  // 게시물 상태 업데이트
  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  }
}

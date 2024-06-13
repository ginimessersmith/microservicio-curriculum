import { v4 as uuid } from 'uuid'
import { BadRequestException, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common"

export const handleError = (error: any): never => {
    const logger = new Logger('Auth Service - Handle Error')
    console.log({ error })
    const supportedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/octet-stream'
      ];
    //   if (!supportedTypes.includes(curriculum.mimetype)) {
    //     throw new UnsupportedMediaTypeException('Unsupported file type');
    //   }

    // if(error.EntityPropertyNotFoundError) throw new InternalServerErrorException('Property "permission" was not found in "Role". Make sure your query is correct.')
    if (error.code === '23505') throw new BadRequestException(error.detail)
    if (error.code === '23502') throw new BadRequestException(error.detail)
    if (error.code === 'EENVELOPE') throw new BadRequestException(error.response)
    if (error.response.error === 'Unauthorized') throw new UnauthorizedException(error.response.message)
    if (error.response.error === 'Bad Request') throw new BadRequestException(error.response.message)
    if (error.response.error === 'Not Found') throw new NotFoundException(error.response.message)
    if (error.response && error.response.data) {
        console.error('Error details:', error.response.data);
    }
    logger.log(error)
    throw new InternalServerErrorException('Unexpected error, check logs')
}


// export const fileChangeName = (
//     req: Express.Request,
//     file: Express.Multer.File,
//     callback: (error: Error | null, filename: string) => void
// ) => {

//     const fileExtension = file.mimetype.split('/')[1]
//     const newName = `${uuid()}.${fileExtension}`
//     callback(null, newName)
// }
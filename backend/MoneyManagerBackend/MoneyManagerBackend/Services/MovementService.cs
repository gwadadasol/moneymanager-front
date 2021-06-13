using System;
using System.Collections.Generic;
using System.Linq;
using MoneyManagerBackend.Domains;

namespace MoneyManagerBackend.Services
{
    public class MovementService : IMovementService
    {
        private readonly List<Movement> _movements;

        public MovementService()
        {
            _movements = new()
            {
                new Movement
                {
                    Id = Guid.NewGuid(),
                    Date = new DateTime(2021, 03, 31),
                    Account = "1",
                    Description = "desc 1",
                    Amount = 10
                },
                new Movement
                {
                    Id = Guid.NewGuid(),
                    Date = new DateTime(2021, 03, 31),
                    Account = "2",
                    Description = "desc 2",
                    Amount = 20
                }
            };

        }

        public bool DelteMovement(Guid movementId)
        {
            var movement = GetMovementById(movementId);

            if (movement == null)
            {
                return false;
            }

            _movements.Remove(movement);
            return true;
        }

        public Movement GetMovementById(Guid movementId)
        {
            return _movements.FirstOrDefault(m => m.Id == movementId);
        }

        public List<Movement> GetMovements()
        {
            return _movements;
        }

        public bool UpdateMovement(Movement movementToUpdate)
        {
            bool exist = GetMovementById(movementToUpdate.Id) != null;

            if (!exist)
                return false;

            var index = _movements.FindIndex(m => m.Id == movementToUpdate.Id);
            _movements[index] = movementToUpdate;
            return true;
        }
    }
}